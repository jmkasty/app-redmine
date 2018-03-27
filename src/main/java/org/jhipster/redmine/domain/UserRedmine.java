package org.jhipster.redmine.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


/**
 * A UserRedmine.
 */
@Entity
@Table(name = "user_redmine")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserRedmine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_user_redmine")
    private Integer id_user_redmine;

    @Column(name = "login")
    private String login;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getId_user_redmine() {
        return id_user_redmine;
    }

    public UserRedmine id_user_redmine(Integer id_user_redmine) {
        this.id_user_redmine = id_user_redmine;
        return this;
    }

    public void setId_user_redmine(Integer id_user_redmine) {
        this.id_user_redmine = id_user_redmine;
    }

    public String getLogin() {
        return login;
    }

    public UserRedmine login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public User getUser() {
        return user;
    }

    public UserRedmine user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserRedmine userRedmine = (UserRedmine) o;
        if (userRedmine.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userRedmine.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserRedmine{" +
            "id=" + getId() +
            ", id_user_redmine=" + getId_user_redmine() +
            ", login='" + getLogin() + "'" +
            "}";
    }
}
